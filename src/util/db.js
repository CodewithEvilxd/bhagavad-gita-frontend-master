import { useQuery, queryCache } from "react-query";
import { apiRequest } from "./util";

/**** USERS ****/

// Fetch user data
export function useUser(uid) {
  // Unique cache key for this query
  const cacheKey = uid && ["user", { uid }];
  // Query to fetch user
  const query = () => apiRequest(`user-get?uid=${uid}`);
  // Fetch data with react-query
  // Docs: https://github.com/tannerlinsley/react-query#queries
  return useQuery(cacheKey, query);
}

// Update an existing user
export function updateUser(uid, data) {
  // Send API request
  return apiRequest(`user-update?uid=${uid}`, "PATCH", data).then((user) => {
    const cacheKey = ["user", { uid }];
    // Update user in cache (causing components to re-render with new data)
    queryCache.setQueryData(cacheKey, user);
    // Return the updated user
    return user;
  });
}

// Create a new user
export function createUser(uid, data) {
  return apiRequest("user-create", "POST", { uid, ...data });
}

/**** ITEMS ****/
/* Example query functions (modify to your needs) */

// Fetch all items by owner
export function useItemsByOwner(owner) {
  // Unique cache key for this query
  const cacheKey = owner && ["items", { owner }];
  // Query to fetch user
  const query = () => apiRequest(`items-get?owner=${owner}`);
  // Fetch data with react-query
  // Docs: https://github.com/tannerlinsley/react-query#queries
  return useQuery(cacheKey, query);
}

// Fetch item data
export function useItem(id) {
  const cacheKey = id && ["item", { id }];
  const query = () => apiRequest(`item-get?id=${id}`);
  return useQuery(cacheKey, query);
}

// Update an item
export function updateItem(id, data) {
  // Send API request
  return apiRequest(`item-update?id=${id}`, "PATCH", data).then((item) => {
    const cacheKey = ["item", { id: item.id }];
    // Update item in cache
    queryCache.setQueryData(cacheKey, item);
    // Also force any query for items by this owner to refetch
    // ensuring that no displayed data is out of date.
    queryCache.refetchQueries(["items", { owner: item.owner }]);
    return item;
  });
}

// Create a new item
export function createItem(data) {
  return apiRequest("item-create", "POST", data).then((item) => {
    // Force any query for items by this owner to refetch
    // ensuring that no displayed data is out of date.
    queryCache.refetchQueries(["items", { owner: item.owner }]);
    return item;
  });
}
