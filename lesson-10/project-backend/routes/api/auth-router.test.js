import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config";

import app from "../../app.js";

import User from "../../models/user.js";

const {PORT, DB_HOST_TEST} = process.env;

describe("test signup route", ()=> {
    let server = null;
    beforeAll(async()=> {
        await mongoose.connect(DB_HOST_TEST);
        server = app.listen(PORT);
    })

    afterAll(async()=> {
        await mongoose.connection.close();
        server.close();
    })

    beforeEach(()=> {
        
    })

    afterEach(async()=> {
        await User.deleteMany({});
    })

    test("test signup with correct data", async()=> {
        const signupData = {
            name: "Bogdan",
            email: "bogdan@gmail.com",
            password: "123456"
        }
        const {statusCode, body} = await request(app).post("/api/auth/signup").send(signupData);

        expect(statusCode).toBe(201);
        expect(body.name).toBe(signupData.name);
        expect(body.email).toBe(signupData.email);

        const user = await User.findOne({email: signupData.email});
        expect(user.email).toBe(signupData.email);
        expect(user.name).toBe(signupData.name);
    })
})