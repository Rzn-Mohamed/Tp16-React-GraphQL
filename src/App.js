import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50">
        <div className="container mx-auto p-4 sm:p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Gestion des Comptes
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Gérez vos comptes bancaires en toute simplicité</p>
          </div>
          
          {/* Create Account Section */}
          <div className="mb-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Créer un nouveau compte
            </h2>
            <CreateCompte />
          </div>
          
          {/* Accounts List Section */}
          <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <CompteList />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
