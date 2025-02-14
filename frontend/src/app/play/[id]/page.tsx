"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";
import { BattleView } from "@/components/battle";
import { useBattle } from "@/hooks/battle";

export default async function BattlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    const { battle, isLoading } = useBattle(parseInt(id));
    useEffect(() => {
        if (!isLoading && !battle) {
            notFound();
        }
    }, [isLoading, battle]);
    return battle ? <BattleView battle={battle} /> : <></>;
}
