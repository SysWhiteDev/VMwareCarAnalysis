import sql from "../services/sql";

const registerActivity = async (userId: number, type: string, severity: number) => {
    await sql`INSERT INTO public.activities (author_id, type, severity, timestamp) VALUES (${userId}, ${type}, ${severity}, ${new Date()})`
        .catch((err) => {
            console.log(err);
        });
}

export default registerActivity;