/**@type {import{"drizzle-kit"}.Config } */

export default{
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_6kzBfo7RIQtH@ep-royal-morning-a1fkuoos-pooler.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require&channel_binding=require',
    }
};