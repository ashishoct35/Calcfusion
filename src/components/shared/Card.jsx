const Card = ({ title, children, className = '', icon }) => {
    return (
        <div className={`card ${className}`}>
            {title && (
                <h3 className="text-xl font-bold mb-4 flex items-center">
                    {icon && <span className="mr-2">{icon}</span>}
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};

export default Card;
