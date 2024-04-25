const LandingPageEventsButton = ({ currentPage, totalPages, setCurrentPage }) => {
    const canGoBack = currentPage > 1;
    const canGoForward = currentPage < totalPages;
  
    const goToPreviousPage = () => {
      if (canGoBack) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const goToNextPage = () => {
      if (canGoForward) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    return (
      <div className="join mx-auto">
        <button className={`join-item btn ${!canGoBack ? 'btn-disabled' : ''}`} onClick={goToPreviousPage}>«</button>
        <button className="join-item btn">Page {currentPage}</button>
        <button className={`join-item btn ${!canGoForward ? 'btn-disabled' : ''}`} onClick={goToNextPage}>»</button>
      </div>
    );
  };
  
  export default LandingPageEventsButton;