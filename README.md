ch-apply-search-filters Component
The ch-apply-search-filters is a React functional component designed to seamlessly integrate with Sitecore's ContentHub SDK. It listens for specific events, such as SEARCH_FINISHED, and applies pre-configured search filters based on the event details.

Features
Event-Driven Filtering: The component listens to the SEARCH_FINISHED event. Once the event fires, it checks the event's search identifier and, if matching, applies the configured filters.
Configurable Filters: Filters can be defined via the filtersConfig prop, offering flexibility in defining which filters to apply.
Attempt Limit: To prevent unintended infinite loops, the component will only try to apply filters a maximum of three times.
Installation
Ensure you have the required dependencies from Sitecore's ContentHub SDK.
Integrate the mb-apply-search-filters component into your React project.
Usage
jsx
Copy code
import ApplySearchFilter from './path-to-mb-apply-search-filters';

function YourComponent() {
    // Define your filtersConfig here...

    return (
        <div>
            {/* Other components */}
            <ApplySearchFilter
                searchIdentifier="your-search-identifier"
                filtersConfig={filtersConfig}
                addFilters={yourAddFiltersFunction}
                getEventSearchIdentifier={yourGetEventSearchIdentifierFunction}
                client={yourContentHubClientInstance}
            />
        </div>
    );
}
Props
searchIdentifier (string): The identifier for the current search.
filtersConfig (Array): An array of filter configurations.
addFilters (Function): A function to add filters based on the provided search identifier and filters array.
getEventSearchIdentifier (Function): A function to get the search identifier from an event.
client (ContentHubClient): An instance of the ContentHub client.

Dependencies
Sitecore ContentHub SDK
React (with Hooks support)

Contributing
Feel free to submit issues or pull requests if you find any bugs or have suggestions for improvements.
