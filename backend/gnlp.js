const language = require('@google-cloud/language');
async function LSSum(text) {
  const client = new language.LanguageServiceClient({
    projectId: 'litscout-sum',
    quotaProject: 'litscout-sum',
  });
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  const [entityResult] = await client.analyzeEntities({ document });
  const importantEntities = entityResult.entities
    .filter((entity) => entity.salience > 0.1)
    .map((entity) => entity.name);

  const [syntaxResult] = await client.analyzeSyntax({ document });
  const sentences = syntaxResult.sentences.map((sentence) => sentence.text.content);
  const summary = sentences.filter((sentence) => {
    return importantEntities.some((entity) => sentence.includes(entity));
  });
  return summary.join(" ");
}

module.exports={
  LSSum
}
