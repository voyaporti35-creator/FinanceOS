import { useMemo } from "react";

import { useAnalytics } from "../../analytics/hooks/useAnalytics";
import { useFinanceSnapshot } from "../../finance/hooks/useFinanceSnapshot";

import { buildAdvisorSuggestions } from "../calculations/advisorEngine";

export function useAdvisor() {

  const { analytics } = useAnalytics();

  const { snapshot } = useFinanceSnapshot();

  const suggestions = useMemo(() => {

    return buildAdvisorSuggestions(snapshot);

  }, [snapshot]);

  return {

    suggestions,

    snapshot,

    analytics,

  };

}