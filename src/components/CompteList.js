import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";

const CompteList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_COMPTES);
  
  const formatCurrency = (amount) => {
    return parseFloat(amount).toFixed(2);
  };
  
  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Chargement des comptes...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-600 font-medium mb-4">Erreur : {error.message}</p>
        <button 
          onClick={() => refetch()}
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Liste des Comptes
        </h2>
        <button 
          onClick={() => refetch()}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 px-5 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualiser
        </button>
      </div>
      
      {data.allComptes && data.allComptes.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500 text-lg">Aucun compte trouvé. Créez-en un !</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.allComptes.map((compte) => (
            <div key={compte.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">ID Compte</span>
                  <p className="font-mono text-sm text-gray-700 mt-1">{compte.id}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  compte.type === 'EPARGNE' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {compte.type === 'EPARGNE' ? '💰 Épargne' : '💳 Courant'}
                </div>
              </div>
              
              <div className="mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 shadow-lg">
                <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wide">Solde</span>
                <p className="text-3xl font-bold text-white mt-1 flex items-baseline gap-1">
                  {formatCurrency(compte.solde)}
                  <span className="text-lg font-semibold text-emerald-100">DH</span>
                </p>
              </div>
              
              <div className="flex items-center text-gray-600 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-500">Créé le:</span>
                <span className="ml-2 font-medium">{new Date(compte.dateCreation).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompteList;