import './Search.scss';

const Search = () => {
    return (
        <>
            <div className="Search-container">
            <div className="Search_right">
                    <span class="material-symbols-outlined">
                        bookmark
                    </span>
                    <span class="material-symbols-outlined">
                        favorite
                    </span>
                </div>
                <div className="Search_left">
                    <input type="text" placeholder='Your intersted Field...' />
                    <button>
                        <span class="material-symbols-outlined">
                            search
                        </span>
                        Get</button>
                </div>
                
            </div>
        </>
    )
}
export default Search;