// Express Rout module import 
var express = require("express");
var app = express();

// File and Funtions import
const OgData = require('../ogtag/Og.json');
const SeoToolModule = require('../module/seotoolmodule.js')



// Local to get OG data by title, slug, or pages
function getogdataFromJson(titleOrSlug) {
    try {
        // Check if OgData is an array and has elements
        if (!Array.isArray(OgData) || OgData.length === 0) {
            throw new Error('OgData is not in the expected format');
        }

        // Find the OG data for the given title, slug, or page
        const ogdata = OgData.find(data =>
            (data.Title && data.Title.toLowerCase() === titleOrSlug.toLowerCase()) ||
            (data.slug && data.slug.toLowerCase() === titleOrSlug.toLowerCase()) ||
            (Array.isArray(data.Pages) && data.Pages.some(page => page.toLowerCase() === titleOrSlug.toLowerCase()))
        );

        return ogdata || null;

    } catch (error) {
        console.error('Error in getogdata function:', error);
        return null;
    }
}


// Online Databased to get OG data by title, slug, or pages using SeoToolModule
async function getogdataFromDatabase(titleOrSlug) {
    try {

        // Create a regex pattern to match the slug, allowing for optional query parameters
        const regexPattern = new RegExp(`^${titleOrSlug}([?&].*)?$`, 'i');

        const query = {
            $or: [
                { slug: new RegExp(`^${titleOrSlug}$`, 'i') },
                { Pages: { $elemMatch: { $regex: new RegExp(`^${titleOrSlug}$`, 'i') } } },
                { Page_Name: regexPattern }
            ]
        };

        // Fetch OG data from SeoToolModule using the query
        const ogdata = await SeoToolModule.findOne(query).exec();

        // Return the found OG data or null if no match
        return ogdata || null;

    } catch (error) {
        console.error('❗Error in getogdataFromDatabase function:', error);
        return null;
    }
}




module.exports = { getogdataFromDatabase, getogdataFromJson };