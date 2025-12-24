function numberToKorean(input) {
    if (input === 0 || input === "0") return "0";

    const LARGE_UNITS = [
        "", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정",
        "재", "극", "항하사", "아승기", "나유타", "불가사의", "무량대수"
    ];
    const SMALL_UNITS = ["", "십", "백", "천"];

    let n = typeof input === "bigint" ? input : BigInt(input);
    let unitIndex = 0;
    let output = "";

    while (n > 0n && unitIndex < LARGE_UNITS.length) {
        const chunk = n % 10000n;

        if (chunk !== 0n) {
            let c = chunk;
            let chunkText = "";

            for (let i = 0; i < 4; i++) {
                const d = c % 10n;
                if (d) {
                    chunkText = d + SMALL_UNITS[i] + chunkText;
                }
                c /= 10n;
            }

            output = chunkText + LARGE_UNITS[unitIndex] + (output ? " " + output : "");
        }

        n /= 10000n;
        unitIndex++;
    }

    return output;
}
