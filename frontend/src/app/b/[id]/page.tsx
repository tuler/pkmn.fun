import { BattleView } from "@/components/battle/view";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = (await params).id;
    return {
        openGraph: {
            images: `/opengraph-image/battle?id=${id}`,
        },
    };
}

export default async function BattlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    return <BattleView id={parseInt(id)} />;
}
