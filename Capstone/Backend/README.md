Feature Store - minimal runnable example

1. Copy .env.example to .env and adjust
2. npm install
3. Start local Kafka/Redis/Mongo manually or via Docker if preferred
4. npm start
5. npm run seed
6. GET http://localhost:3000/features?entityId=user1&set=user_profile_rolling
