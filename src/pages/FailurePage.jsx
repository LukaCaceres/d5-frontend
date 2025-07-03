const FailurePage = () => {
    return (
        <div className="bg-gray-900 h-screen flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Pago fallido</h1>
            <p className="text-lg text-gray-700">Hubo un problema con tu pago. Inténtalo nuevamente.</p>
        </div>
    );
};

export default FailurePage;
