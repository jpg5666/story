import { fetchAllStories, uploadStory } from "../../data/api.js";

export const homeModel = {
  async fetchStoriesWithLocation() {
    const stories = await fetchAllStories({ location: 1 });
    return stories || [];
  },

  uploadStory,
};
