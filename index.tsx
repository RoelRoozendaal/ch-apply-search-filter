import { createRoot } from "react-dom/client";
import { FieldFilterRequestResource } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/field-filter-request-resource";
import AddSearchFilters from "./ApplySearchFilter";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";
import { Fragment } from "react";
import { FilterConfig } from './FilterConfigTypes';

interface Context {
    user: {
        userGroups: string[];
    };
    config: {
        hideFilters: {
            [key: string]: string[];
        };
        applyFilters: FilterConfig[];
        searchIdentifier: string;
    };
    api: {
        search: {
            addFilters: (
                searchIdentifier: string,
                filters: Array<FieldFilterRequestResource>
            ) => void;
            getEventSearchIdentifier: (searchIdentifier: string) => string;
        };
    };
    client: ContentHubClient;
}

export default function createExternalRoot(container: HTMLElement) {
    let root = createRoot(container);
    
    return {
        render(context: Context) {
            const { addFilters, getEventSearchIdentifier } = context.api.search;
            const { searchIdentifier, applyFilters } = context.config;

            root.render(
                <Fragment>
                    {
                        (
                            <AddSearchFilters
                                searchIdentifier={searchIdentifier}
                                addFilters={addFilters}
                                getEventSearchIdentifier={getEventSearchIdentifier}
                                filtersConfig={applyFilters || []}
                                client={context.client}
                            />
                        )
                    }
                </Fragment>
            );
        },

        unmount() {
            root.unmount();
        },
    };
}
