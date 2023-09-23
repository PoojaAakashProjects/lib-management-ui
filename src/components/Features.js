import React, { useState, useEffect } from 'react';
import './Features.css';
import FilterPopup from './FilterModal';



const Features = ({ onClickAdd, handleClearFilters, handlePageChange, page, totalPages ,onFilterApply,isFiltersApplied , setIsFiltersApplied}) => {
    console.log('features ', page, totalPages)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    // const [isFiltersApplied , setIsFiltersApplied] = useState(false)
    const [filters,setFilters] = useState();
    const openFilterModal = () => {
        setIsFilterModalOpen(true);
      };
    
      const closeFilterModal = () => {
        setIsFilterModalOpen(false);
      };

      const handleApplyFilter = (fiterData) => {
        console.log('filter data ',fiterData)
        setIsFilterModalOpen(false);
        onFilterApply(fiterData)
        setIsFiltersApplied(true);

      }

    return (
        <div className='features-header'>
            <h2 style={{ "marginLeft": "4%", "fontFamily": "-moz-initial" }}>Books</h2>
            <div className='features'>
                <div className='pagination'>
                    <button onClick={() => handlePageChange(page - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
                            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                        </svg>
                    </button>
                    <span>{page} </span>
                    <span> - </span>
                    <span> 10 </span>
                    <span>of </span>
                    <span> {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                        </svg>
                    </button>
                </div>
                {/* <div className='filter-button-container'> */}
                <button onClick={openFilterModal}>Filter</button>
                {
                    isFiltersApplied &&
                    <button onClick={handleClearFilters}>Clear Filters
                    </button>
                }
                {/* </div> */}
                
                
                
                <FilterPopup
                    style={{width:"700px",height:"300px"}}
                    isOpen={isFilterModalOpen}
                    onRequestClose={closeFilterModal}
                    applyFilter = {handleApplyFilter}
                />
                <button onClick={onClickAdd}>Add</button>
            </div>

        </div>
    )
}

export default Features