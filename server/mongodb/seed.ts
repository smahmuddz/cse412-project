import { hash } from "argon2";
import { client, db } from "./client";

async function seed() {
  const users = db.collection("users");
  const user = await users.findOne({});

  if (user) return client.close();

  const passwordHash = await hash("root");

  await users.insertMany([
    {
      username: "admin",
      email: "root@root.com",
      password: passwordHash,
      role: "admin",
    },
    {
      username: "faculty",
      email: "faculty@root.com",
      password: passwordHash,
      role: "faculty",
    },
    {
      username: "student",
      sid: "2222-2-22-222",
      password: passwordHash,
      role: "student",
    },
  ]);

  client.close();
}

seed()
  .then(() => console.log("Database seeded successfully!"))
  .catch((error) => console.error("Error seeding database!", error));