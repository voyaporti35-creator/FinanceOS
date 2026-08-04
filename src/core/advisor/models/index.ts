export type AdvisorPriority =
  | "low"
  | "medium"
  | "high";


export type AdvisorCategory =
  | "saving"
  | "debt"
  | "liquidity"
  | "investment"
  | "mortgage"
  | "wealth";


export interface AdvisorSuggestion {

  id: string;


  priority: AdvisorPriority;


  category: AdvisorCategory;


  title: string;


  description: string;


  action: string;


  impact?: string;


  metric?: string;

}