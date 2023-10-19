import { FieldFilterRequestResource } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/field-filter-request-resource";
import { FunctionComponent, useState, useEffect } from "react";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";
import { FilterOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/filter-operator";
import { RequestedFilterType } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/requested-filter-type";
import { FilterConfig } from './FilterConfigTypes';

interface ApplySearchFilterProps {
    searchIdentifier: string;
    filtersConfig: FilterConfig[];
    addFilters: (searchIdentifier: string, filters: Array<FieldFilterRequestResource>) => void;
    getEventSearchIdentifier: (searchIdentifier: string) => string;
    client: ContentHubClient;
}

const ApplySearchFilter: FunctionComponent<ApplySearchFilterProps> = ({
    searchIdentifier,
    addFilters,
    getEventSearchIdentifier,
    filtersConfig,
    client,
}) => {
    const [attemptCount, setAttemptCount] = useState(0);
    const MAX_ATTEMPTS = 3;
    useEffect(() => {
        const applyConfiguredFilters = (): void => {
            const filtersToApply: FieldFilterRequestResource[] = filtersConfig.map(filter => {
                return {
                    fieldName: filter.filterName,
                    operator: FilterOperator.Equals,
                    values: filter.values.map(v => v.value),
                    nestedValues: [],
                    hidden: false,
                    filterType: RequestedFilterType.DynamicFilter,
                    role: null,
                    visible: true,
                    multiSelect: false
                };
            });
            addFilters(searchIdentifier, filtersToApply);
        };

        const applyFiltersOnSearchEvent = (evt: Event): void => {
            const { searchIdentifier: eventSearchIdentifier } = (
                evt as CustomEvent<{
                    searchIdentifier: string;
                }>
            ).detail;

            // Check attempt count
            if (attemptCount >= MAX_ATTEMPTS) {
                console.warn("Maximum filter apply attempts reached. Skipping further attempts.");
                return;
            }

            if (eventSearchIdentifier === getEventSearchIdentifier(searchIdentifier)) {
                applyConfiguredFilters();
                setAttemptCount(prevCount => prevCount + 1);
            } else {
                console.log("Search identifiers do not match. Not applying filters.");
            }
        };

        window.addEventListener("SEARCH_FINISHED", applyFiltersOnSearchEvent);
        
        return () => {
            // Cleanup listener on component unmount
            window.removeEventListener("SEARCH_FINISHED", applyFiltersOnSearchEvent);
        };
    }, [searchIdentifier, addFilters, getEventSearchIdentifier, filtersConfig, client, attemptCount]);
    return null;
};
export default ApplySearchFilter;
