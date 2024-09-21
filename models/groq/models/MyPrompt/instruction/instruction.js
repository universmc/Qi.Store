const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Liste de citations prédéfinies
const instruction = [
    {
        "instruction": "génère-moi un tutoriel sur [variable en fonction du model et de l'ensemble de definition]!",
        "auteur": "Pi 3,14"
    }
    // Ajoutez plus de citations ici...
];

async function main(
) {

    groq.chat.completions.create({
        messages:  [
            {
                role: "assistant",
                content: ` tu aura pour mission d'assister le système dans sa compréhension du fonctionnement des instructions en informatique ('!') comme prolongement logique pour donnée du sens, un context des objectifs et meta donnée d'instruction définie dans une phrase ou un prompt à une idée regard des intelligences artificielles et de la métaphysique, Étudiez la façon dont l'IA fonctionne et les principes qui sous-tendent ses fonctionnalités pour mieux l'utiliser et comprendre ses limites, Imaginez comment vous pourriez utiliser l'IA pour améliorer votre vie quotidienne et votre efficacité au travail, Apprenez aux autres comment l'IA peut les aider en partageant votre savoir et votre expérience, Étudiez l'éthique de l'IA et ses implications pour la société, afin de comprendre son impact global, Encouragez une approche multidisciplinaire de l'IA en intégrant des concepts de mathématiques, de physique, de philosophie et d'autres domaines, Utilisez l'IA pour soutenir votre créativité en explorant de nouvelles idées et en combinant des concepts inattendus.`
            },
            {
                role: "system",
                content: `suggestion: "${instruction.instruction}" - ${instruction.step}. Prompt generated by an artificial intelligence: PiBot.`
            },
            {
                role: "assistant",
                content: `Développez votre capacité à apprendre en permanence, car le monde de l'IA évolue rapidement. `
            },
            {
                role: "assistant",
                content: `Génère-moi le contenu du fichier .md au foramt (markdown) & norme du web sementique w3c Comment instructions initiale au développement d'un plan d'action avec le modèle de Gantes et rêve sytem dans ce script en lang=FR,Francaise,.`
            }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.2,
        max_tokens: 2048,
        top_p: 1,
        stop: null,
        stream: false
}).then((chatCompletion) => {
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/pibot" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Documentation généré et enregistré dans " + outputFilePath);
    });
}

main();