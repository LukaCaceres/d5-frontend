const PendingPage = () => {
    return (
        <div className="bg-gray-900 h-screen flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold text-yellow-500 mb-4">Pago pendiente</h1>
            <p className="text-lg text-gray-700">Tu pago está siendo procesado. Te avisaremos cuando se apruebe.</p>
        </div>
    );
};

export default PendingPage;
