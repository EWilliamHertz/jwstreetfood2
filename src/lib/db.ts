import fs from "fs";
import path from "path";

const DB_FILE_PATH = path.join(process.cwd(), "src", "data", "db.json");

interface DbData {
  menu_items: any[];
  weekly_schedule: any[];
  reviews: any[];
  bookings: any[];
  subscribers: any[];
}

function getLocalData(): DbData {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading db.json:", err);
  }
  return {
    menu_items: [],
    weekly_schedule: [],
    reviews: [],
    bookings: [],
    subscribers: []
  };
}

function saveLocalData(data: DbData) {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving db.json:", err);
  }
}

export async function query(sql: string, params: any[] = []): Promise<{ rows: any[] }> {
  // If user configures DATABASE_URL in the future, connect to pg
  if (process.env.DATABASE_URL) {
    try {
      const { Pool } = await import("pg");
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      });
      const client = await pool.connect();
      try {
        const res = await client.query(sql, params);
        return res;
      } finally {
        client.release();
        await pool.end();
      }
    } catch (pgError) {
      console.warn("PostgreSQL query failed, falling back to local file store:", pgError);
    }
  }

  // Local JSON Database Engine
  const data = getLocalData();
  const trimmed = sql.trim();

  // Weekly Schedule
  if (/SELECT\s+\*\s+FROM\s+weekly_schedule/i.test(trimmed)) {
    return { rows: [...data.weekly_schedule].sort((a, b) => (a.id || 0) - (b.id || 0)) };
  }

  if (/TRUNCATE\s+TABLE\s+weekly_schedule/i.test(trimmed)) {
    data.weekly_schedule = [];
    saveLocalData(data);
    return { rows: [] };
  }

  if (/INSERT\s+INTO\s+weekly_schedule/i.test(trimmed)) {
    const [day_of_week, location_name, time_range, is_active] = params;
    const newId = data.weekly_schedule.length > 0 ? Math.max(...data.weekly_schedule.map((d: any) => d.id || 0)) + 1 : 1;
    data.weekly_schedule.push({
      id: newId,
      day_of_week,
      location_name,
      time_range,
      is_active: Boolean(is_active)
    });
    saveLocalData(data);
    return { rows: [] };
  }

  // Menu Items
  if (/SELECT\s+\*\s+FROM\s+menu_items/i.test(trimmed)) {
    return { rows: [...data.menu_items].sort((a, b) => (a.id || 0) - (b.id || 0)) };
  }

  if (/UPDATE\s+menu_items\s+SET\s+is_sold_out/i.test(trimmed)) {
    const [is_sold_out, id] = params;
    const item = data.menu_items.find((m: any) => m.id === Number(id));
    if (item) {
      item.is_sold_out = Boolean(is_sold_out);
      saveLocalData(data);
    }
    return { rows: [] };
  }

  if (/UPDATE\s+menu_items\s+SET/i.test(trimmed)) {
    const [title_en, title_sv, desc_en, desc_sv, price, image, additional_images, tags, id] = params;
    const index = data.menu_items.findIndex((m: any) => m.id === Number(id));
    if (index !== -1) {
      data.menu_items[index] = {
        ...data.menu_items[index],
        title_en,
        title_sv,
        desc_en,
        desc_sv,
        price,
        image,
        additional_images,
        tags
      };
      saveLocalData(data);
    }
    return { rows: [] };
  }

  if (/INSERT\s+INTO\s+menu_items/i.test(trimmed)) {
    const [title_en, title_sv, desc_en, desc_sv, price, image, additional_images, tags] = params;
    const newId = data.menu_items.length > 0 ? Math.max(...data.menu_items.map((m: any) => m.id || 0)) + 1 : 1;
    data.menu_items.push({
      id: newId,
      title_en,
      title_sv,
      desc_en,
      desc_sv,
      price,
      image,
      additional_images,
      tags,
      is_sold_out: false
    });
    saveLocalData(data);
    return { rows: [] };
  }

  if (/DELETE\s+FROM\s+menu_items/i.test(trimmed)) {
    const [id] = params;
    data.menu_items = data.menu_items.filter((m: any) => m.id !== Number(id));
    saveLocalData(data);
    return { rows: [] };
  }

  // Reviews
  if (/SELECT\s+\*\s+FROM\s+reviews/i.test(trimmed)) {
    return { rows: [...data.reviews].sort((a, b) => (b.id || 0) - (a.id || 0)) };
  }

  // Bookings
  if (/SELECT\s+(id,\s*date,\s*time|\*)\s+FROM\s+bookings/i.test(trimmed)) {
    return { rows: [...data.bookings] };
  }

  if (/INSERT\s+INTO\s+bookings/i.test(trimmed)) {
    const [name, email, date, time, guests, type, details] = params;
    const newId = data.bookings.length > 0 ? Math.max(...data.bookings.map((b: any) => b.id || 0)) + 1 : 1;
    data.bookings.push({
      id: newId,
      name,
      email,
      date,
      time,
      guests,
      type,
      details,
      status: "pending",
      created_at: new Date().toISOString()
    });
    saveLocalData(data);
    return { rows: [] };
  }

  if (/UPDATE\s+bookings\s+SET\s+status/i.test(trimmed)) {
    const [status, id] = params;
    const booking = data.bookings.find((b: any) => b.id === Number(id));
    if (booking) {
      booking.status = status;
      saveLocalData(data);
    }
    return { rows: [] };
  }

  // Subscribers
  if (/SELECT\s+\*\s+FROM\s+subscribers/i.test(trimmed)) {
    return { rows: [...data.subscribers] };
  }

  if (/INSERT\s+INTO\s+subscribers/i.test(trimmed)) {
    const [email] = params;
    if (!data.subscribers.some((s: any) => s.email === email)) {
      data.subscribers.push({
        id: data.subscribers.length + 1,
        email,
        created_at: new Date().toISOString()
      });
      saveLocalData(data);
    }
    return { rows: [] };
  }

  return { rows: [] };
}
