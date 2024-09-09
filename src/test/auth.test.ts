import request from 'supertest'
import app from '../app'
import authRoutes from '../api/auth/route'
import mongoose from 'mongoose';

app.use('/auth', authRoutes);

describe('Test for endpoint /auth', () => {
    test('Retorna codigo 200 si se loguea con exito', async () => {
        const response = await request(app)
        .post('/auth')
        .send({ email: 'email@email.com', password: '1234567' })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
    });

    test('Retorna codigo 500 si las credenciales son incorrectas', async () => {
        const response = await request(app)
        .post('/auth')
        .send({ email: 'email@email.com', password: '12345678' })
        expect(response.statusCode).toBe(500)
        // expect(response.body).toHaveProperty('Invalid email or password');
    });

    
});


beforeAll(done =>{
    done()
})

afterAll( done => {
    mongoose.connection.close();
    done();
})