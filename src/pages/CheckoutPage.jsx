import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckoutPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const iniciarPago = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.post(
                    "https://doble-cinco-backend.onrender.com/api/payment/crear_preferencia",
                    {},
                    {
                        headers: {
                            "x-token": token
                        }
                    }
                );

                const { id } = res.data;

                if (!id) throw new Error("No se obtuvo la preferencia.");

                // Redireccionar a la URL de Checkout Pro
                window.location.href = `https://www.mercadopago.com/checkout/v1/redirect?pref_id=${id}`;
            } catch (error) {
                console.error("Error al iniciar el pago:", error);
                alert("Hubo un problema al iniciar el pago.");
                setLoading(false);
            }
        };

        iniciarPago();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            {loading ? (
                <p className="text-xl font-medium">Redirigiendo a Mercado Pago...</p>
            ) : (
                <p className="text-red-500">No se pudo iniciar el pago.</p>
            )}
        </div>
    );
};

export default CheckoutPage;
