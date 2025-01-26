import React from "react";

import "./Tag.css"; // Importing the CSS file for styling

// Tag component that represents an individual tag with selectable functionality
const Tag = ({ tagName, selectTag, selected }) => {
    // Define styles for each tag based on its name
    const tagStyle = {
        HTML: { backgroundColor: "#fda821" }, // Style for HTML tag
        CSS: { backgroundColor: "#15d4c8" }, // Style for CSS tag
        JavaScript: { backgroundColor: "#ffd12c" }, // Style for JavaScript tag
        React: { backgroundColor: "#4cdafc" }, // Style for React tag
        default: { backgroundColor: "#f9f9f9" }, // Default style for unselected tags
    };

    return (
        <button
            type='button'
            className='tag'
            // Apply the appropriate style based on whether the tag is selected
            style={selected ? tagStyle[tagName] : tagStyle.default}
            // Handle tag selection on click
            onClick={() => selectTag(tagName)}
        >
            {tagName} {/* Display the tag name */}
        </button>
    );
};

export default Tag;
