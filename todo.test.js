const db = require("./data/db-config");
const server = require("./api/server");
const superTest = require("supertest");
const supertest = require("supertest");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe("Todo App Server Test", () => {
    it("[1] Gorevler listeleniyor mu?", async () => {
        const res = await superTest(server).get("/api/gorev");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });
    it("[2] Id ye gore listeleniyor mu?", async () => {
        const res = await superTest(server).get("/api/gorev/1");
        expect(res.status).toBe(200);
        expect(res.body.GorevId).toBe(1);
        expect(res.body).toEqual({
            "GorevId": 1,
            "Adi": "Sağlıklı beslen",
            "Aciklama": "Sağlıklı olmak için"
        })
    });
    it("[3] Gorev eklenebiliyor mu?", async () => {
        const gorev = {
            Adi: "CSS öğren",
            Aciklama: "Frontende hakim ol"
        }
        const res = await superTest(server).post("/api/gorev").send(gorev);
        expect(res.status).toBe(201);
        expect(res.body.Adi).toBe("CSS öğren")
    });
    it("[4] Gorev siliniyor mu?", async () => {
        await superTest(server).delete("/api/gorev/2");
        const res = await superTest(server).get("/api/gorev/2");
        expect(res.status).toBe(404);
    });
    it("[5] Tasklar listeleniyor mu?", async () => {
        const res = await superTest(server).get("/api/task");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });
    it("[6] Tasklar Idye göre listeleniyor mu?", async () => {
        const res = await superTest(server).get("/api/task/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            "TaskId": 1,
            "Adi": "Spora git",
            "Aciklama": "1 saat kardiyo yap",
            "Tarih": "5/6/2023",
            "GorevId": 1
        });
    });
    it("[7] Task eklenebiliyor mu?", async () => {
        const task = {
            "Adi": "Basketbol oyna",
            "Aciklama": "1 saat kardiyo yap",
            "GorevId": 1
        }
        const res = await superTest(server).post("/api/task").send(task);
        expect(res.status).toBe(201);
        expect(res.body.Adi).toBe("Basketbol oyna")
    });
    it("[8] Task siliniyor mu?", async () => {
        await superTest(server).delete("/api/task/2");
        const res = await superTest(server).get("/api/task/2");
        expect(res.status).toBe(404);
    });

})