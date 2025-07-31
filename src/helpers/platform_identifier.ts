const extractInfoFromText = async (result: string[]) => {
  const extractedInfo: any = {
    Plataforma: null,
    Formato: null,
    print_cortado: false,
  };

  // Const específica para prints de stories cortados ao meio, para defini-los por posição e identifica-los como story.
  // const positionStories = result.indexOf("visualizacoes");
  // const positionAlcanceStories = result.indexOf("alcance");

  // const storyPartsEspecificsVisualization = result[positionStories + 2].includes('interacoes')
  // const storyPartsEspecificsAlcance = result[positionAlcanceStories + 3].includes('contas') && result[positionAlcanceStories + 4].includes('alcancadas')
  const positionStories =
    result.indexOf("visualizacoes") >= 0
      ? result.indexOf("visualizacoes")
      : result.indexOf("views");
  const positionAlcanceStories =
    result.indexOf("alcance") >= 0
      ? result.indexOf("alcance")
      : result.indexOf("reach");

  const storyPartsEspecificsVisualization =
    result[positionStories + 2]?.includes("interacoes") ||
    result[positionStories + 2]?.includes("interactions");
  const storyPartsEspecificsAlcance =
    (result[positionAlcanceStories + 3]?.includes("contas") ||
      result[positionAlcanceStories + 3]?.includes("accounts")) &&
    (result[positionAlcanceStories + 4]?.includes("alcancadas") ||
      result[positionAlcanceStories + 4]?.includes("reached"));

  // Validação dos dados de acordo com texto extraído
  if (
    (result.includes("insights") &&
      result.includes("do") &&
      result.includes("reel")) ||
    (result.includes("interacoes") &&
      result.includes("do") &&
      result.includes("reel"))
  ) {
    extractedInfo.Plataforma = "Instagram";
    extractedInfo.Formato = "Reels";

    if (
      !result.includes("comentarios") ||
      (!result.includes("visao") && !result.includes("geral")) ||
      !result.includes("curtidas")
    ) {
      extractedInfo.print_cortado = true;
    }
    // Extrair outros dados específicos do Reels
  } else if (
    storyPartsEspecificsVisualization ||
    storyPartsEspecificsAlcance ||
    result.includes("story") ||
    result.includes("stories") ||
    ((result.includes("interacoes") || result.includes("interactions")) &&
      (result.includes("com") || result.includes("with")) &&
      result.includes("stories")) ||
    ((result.includes("proximo") || result.includes("next")) &&
      result.includes("story")) ||
    ((result.includes("toques") || result.includes("taps")) &&
      (result.includes("em") || result.includes("on")) &&
      (result.includes("figurinhas") || result.includes("stickers"))) ||
    result.includes("respostas") ||
    result.includes("replies")
  ) {
    extractedInfo.Plataforma = "Instagram";
    extractedInfo.Formato = "Story";

    // if (!result.includes('avanco') ||
    //     (!result.includes('atividade') && !result.includes('do') && !result.includes('perfil')) ||
    //     (!result.includes('visao') && !result.includes('geral')) ||
    //     !result.includes('respostas')) {
    //     extractedInfo.print_cortado = true
    // }

    // Verificação de print cortado
    if (
      (!result.includes("avanco") && !result.includes("advance")) ||
      (!result.includes("atividade") &&
        !result.includes("activity") &&
        !result.includes("do") &&
        !result.includes("of") &&
        !result.includes("perfil") &&
        !result.includes("profile")) ||
      (!result.includes("visao") &&
        !result.includes("overview") &&
        !result.includes("geral") &&
        !result.includes("general")) ||
      (!result.includes("respostas") && !result.includes("replies"))
    ) {
      extractedInfo.print_cortado = true;
    }
    // Extrair outros dados específicos do Story
  } else if (
    result.includes("insights") &&
    ((result.includes("da") && result.includes("publicacao")) ||
      result.includes("dapublicao") ||
      result.includes("publicao")) &&
    !result.includes("reacoes")
  ) {
    extractedInfo.Plataforma = "Instagram";
    extractedInfo.Formato = "Feed";

    if (
      (!result.includes("contas") &&
        !result.includes("com") &&
        !result.includes("engajamento")) ||
      !result.includes("impressoes") ||
      (!result.includes("interacoes") &&
        !result.includes("com") &&
        !result.includes("publicacoes")) ||
      (!result.includes("visitas") &&
        !result.includes("ao") &&
        !result.includes("perfil")) ||
      !result.includes("anuncio")
    ) {
      extractedInfo.print_cortado = true;
    }

    // Extrair outros dados específicos do Feed
  } else if (
    result.includes("atividade") &&
    (result.includes("do") || result.includes("da")) &&
    (result.includes("tweet") || result.includes("post"))
  ) {
    extractedInfo.Plataforma = "Twitter";
    extractedInfo.Formato = "Tweet";
    // Extrair outros dados específicos do Twitter
  } else if (
    result.includes("insights") &&
    result.includes("da") &&
    result.includes("publicacao") &&
    result.includes("reacoes")
  ) {
    extractedInfo.Plataforma = "Facebook";
    extractedInfo.Formato = "Post";
  }
  // Extrair outros dados específicos do TikTok
  else if (
    ((result.includes("analise") || result.includes("anlise")) &&
      result.includes("de") &&
      (result.includes("video") || result.includes("vdeo"))) ||
    (result.includes("total") &&
      result.includes("de") &&
      result.includes("espectadores"))
  ) {
    extractedInfo.Plataforma = "TikTok";
    extractedInfo.Formato = "Tiktok";

    if (
      (!result.includes("visualizacoes") &&
        !result.includes("de") &&
        !result.includes("video")) ||
      (!result.includes("localizacoes") && !result.includes("i")) ||
      (!result.includes("principais") && !result.includes("palavras")) ||
      !result.includes("genero")
    ) {
      extractedInfo.print_cortado = true;
    }
  } else if (
    (result.includes("conteudo") &&
      result.includes("do") &&
      result.includes("canal")) ||
    (result.includes("painel") &&
      result.includes("do") &&
      result.includes("canal")) ||
    result.includes("studio") ||
    result.includes("ganhos") ||
    result.includes("youtube")
  ) {
    extractedInfo.Plataforma = "Youtube";
    extractedInfo.Formato = "Vídeo";

    if (
      !result.includes("visualizacoes") ||
      (!result.includes("duracao") &&
        !result.includes("media") &&
        !result.includes("da") &&
        !result.includes("visualizacao")) ||
      (!result.includes("expectadores") && !result.includes("unicos"))
    ) {
      extractedInfo.print_cortado = true;
    }
  }

  return extractedInfo;
};

export const processExtractedText = async (text: string) => {
  // Transformar o texto em um array de palavras, similar ao código Python
  const result = text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => removeAccents(word));
  // Implementar a lógica de extração de dados
  const extractedInfo = await extractInfoFromText(result);

  return extractedInfo;
};

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
