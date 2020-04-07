import _ from "lodash";

/**
 * QueryNormalizer middleware normalizes request query parameters as objects containing operations and filter values.
 *
 * For example:
 * Following query: /?param1=a&param2[in]=x,y,z&param3[gt]=10&param3[lt]=20 will be normalized to:
 * {
 *     param1: {
 *         eq: "a"
 *     },
 *     param2: {
 *         in: ["x", "y", "z"]
 *     },
 *     param3: {
 *         gt: 10,
 *         lt: 20
 *     }
 * }
 *
 * @param request
 * @param response
 * @param next
 * @returns {*}
 * @constructor
 */
export const QueryNormalizer = async (request, response, next) => {
    try {
        let query = {};

        _.forEach(request.query, function (filterValue, filterName) {
            query[filterName] = {};

            if (Array.isArray(filterValue)) {
                throw new Error(`Bad query. Invalid parameter format: ${filterName}`);
            }

            // Multiple operations defined
            if (_.isObject(filterValue)) {
                _.forEach(filterValue, function (value, operation) {
                    if (_.isArray(value)) {
                        throw new Error(`Bad query. Duplicate filter: ${filterName}[${operation}]`);
                    }

                    if (operation === "in") {
                        filterValue.in = filterValue.in.split(",");
                    }
                });

                query[filterName] = filterValue;
            }

            // Single string filter value is considered "equals" operation
            if (_.isString(filterValue)) {
                query[filterName].eq = filterValue;
            }
        });

        request.query = query;

        return next();
    }
    catch (exception) {
        return next(exception);
    }
};
