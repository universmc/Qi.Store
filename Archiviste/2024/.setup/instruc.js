const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Fonction pour générer un nom de fichier à partir d'une instruction
function generateFileName(instruction) {
    return "output/" + instruction.instruction.replace(/ /g, "-") + ".md";
}

async function main(
) {
    // Lire les instructions à partir d'un fichier JSON
const instructions = JSON.parse(fs.readFileSync("instructions.json"));

    // Générer les documents Markdown pour chaque instruction
instructions.forEach((instruction) => {
        groq.chat.completions.create({
            messages: [
                {
                    role: "assistant",
                    content: `Génère-moi un tutoriel sur ${instruction.instruction}`,
                },
                {
                    role: "system",
                    content: `Votre mission consiste à assister l'IA dans la compréhension du fonctionnement des instructions en informatique (!) comme prolongement logique pour donner du sens, un contexte d'objectifs et de métadonnées d'instruction définies dans une phrase ou un prompt.`,
                },
                {
                    role: "system",
                    content: `Suggestion: "${instruction.instruction}" - Créé par PiBot, une intelligence artificielle.`,
                },
            ],
            model: "mixtral-8x7b-32768",
            temperature: 0.2,
            max_tokens: 2048,
            top_p: 1,
            stop: null,
            stream: false,
        }).then((chatCompletion) => {
            const mdContent = chatCompletion.choices[0]?.message?.content;
            const outputFilePath = generateFileName(instruction);
            fs.writeFileSync(outputFilePath, mdContent);
            console.log(`Documentation générée et enregistrée dans ${outputFilePath}`);
        });
    });
}

main();
