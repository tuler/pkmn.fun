import { BattleView } from "@/components/battle";

export default async function BattlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    return <BattleView id={parseInt(id)} />;
}
