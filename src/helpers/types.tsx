export interface UserDataObject {
  _id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  paying: boolean;
  password?: string | null;
  confirmPassword?: string | null;
  permissions: string[];
}

export interface NewUserDataObject {
  _id?: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  password?: string | null;
  paying: boolean;
  confirmPassword?: string | null;
  permissions: string[];
}

export interface CustomerDataObject {
  _id?: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  canal?: string | null;
  revenue?: string | null;
}

export interface AnalyticsObjectData {
  _id?: string | null;
  name: string | null;
  customerId?: string | null;
  userId: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  files: string[];
}

export interface FilesFromAnalytics {
  name: string;
  size: number;
  key: string;
  alt: string;
  url: string;
  userId: string;
}

export interface FilesAnalyticsObjectData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  keyFile: String;
  influencer: string;
  plataform: string;
  format: string;
  campaign: string;
  type: string;
  followersNumber: number;
  impressoes: number;
  visualizacoes: number;
  alcance: number;
  seguidores_alcancados: number;
  nao_seguidores_integram: number;
  visualizacoes_completas: number;
  taxa_retencao: number;
  tempo_medio_visualizacao: number;
  taxa_for_you: number;
  cliques_link: number;
  clique_arroba: number;
  clique_hashtag: number;
  avancar: number;
  voltar: number;
  sair: number;
  proximo_story: number;
  visitas_perfil: number;
  comecaram_seguir: number;
  tempo_stories: number;
  curtidas: number;
  salvamentos: number;
  compartilhamentos: number;
  comentarios: number;
  data_publicacao: string;
  userId: string;
  files: FilesFromAnalytics[] | [];
}

export interface ReportDashboard {
  influencers: string | number;
  publis: string | number;
  seguidores_totais: string | number;
  impressoes_views: string | number;
  alcance_total: string | number;
  alcance_seguidores: string | number;
  engajamento_total: string | number;
  taxa_de_engajamento: string | number;
  comentarios_total: string | number;
}
