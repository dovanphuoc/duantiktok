import React from 'react';
import Preview from '~/components/SearchPreview/SearchPreview'

function SearchPreview() {
    const handleViewAll = () => {
        console.log('view all')
    }
    return (
        <div>
            <Preview
                onViewAll={handleViewAll('Son')}
            />
        </div>
    );
}

export default SearchPreview;