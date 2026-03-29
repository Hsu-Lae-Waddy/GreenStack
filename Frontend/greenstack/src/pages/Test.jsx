import React, { useState } from 'react';
import { 
  Edit2, LayoutList, Bookmark, LogOut, 
  User, Briefcase, CheckCircle2, ChevronRight 
} from 'lucide-react';

const Test = () => {
  // 1. ADD THESE STATES AT THE TOP OF YOUR COMPONENT
  const [isSelectingRole, setIsSelectingRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-20">
      {/* ... other code ... */}

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-[#3F865F] font-black text-lg mb-4 italic">Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton icon={<Edit2 size={18} />} label="Edit Profile" />
          <ActionButton icon={<LayoutList size={18} />} label="My Market Listings" />

          {/* 2. LOGIC FOR THE SAVED ROLE BUTTON */}
          {!selectedRole ? (
            // IF NO ROLE IS CHOSEN YET
            !isSelectingRole ? (
              // STEP 1: SHOW ORIGINAL BUTTON
              <button 
                onClick={() => setIsSelectingRole(true)}
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 border-l-4 border-l-[#A3C475] bg-[#F9FBF7] text-[#3F865F] hover:shadow-md transition-all active:scale-95"
              >
                <div className="flex items-center gap-3 font-bold text-sm">
                  <Bookmark size={18} /> Saved Role
                </div>
                <ChevronRight size={18} opacity={0.5} />
              </button>
            ) : (
              // STEP 2: SHOW SELECTION OPTIONS (Farmer or Broker)
              <div className="flex gap-2 p-1 bg-[#F9FBF7] rounded-2xl border-2 border-dashed border-[#A3C475] animate-in fade-in zoom-in duration-300">
                <button 
                  onClick={() => setSelectedRole('Farmer')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-xl text-xs font-black text-[#3F865F] hover:bg-[#3F865F] hover:text-white transition-all shadow-sm"
                >
                  <User size={14} /> Farmer
                </button>
                <button 
                  onClick={() => setSelectedRole('Broker')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-xl text-xs font-black text-[#3F865F] hover:bg-[#3F865F] hover:text-white transition-all shadow-sm"
                >
                  <Briefcase size={14} /> Broker
                </button>
              </div>
            )
          ) : (
            // STEP 3: SHOW SAVED STATE & DISABLE BUTTON
            <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 opacity-80 cursor-not-allowed">
              <div className="flex items-center gap-3 font-bold text-sm text-[#3F865F] italic">
                <CheckCircle2 size={18} /> Role Saved: <span className="text-[#C5A677]">{selectedRole}</span>
              </div>
              <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest italic">Locked</span>
            </div>
          )}

          <ActionButton icon={<LogOut size={18} />} label="Logout" danger />
        </div>
      </div>
      
      {/* ... other code ... */}
    </div>
  );
};

// Generic ActionButton sub-component (keep this as you had it)
const ActionButton = ({ icon, label, danger = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
      danger 
      ? 'border-red-50 border-l-4 border-l-red-500 bg-red-50/30 text-red-600' 
      : 'border-gray-50 border-l-4 border-l-[#A3C475] bg-[#F9FBF7] text-[#3F865F] hover:shadow-md'
    }`}
  >
    <div className="flex items-center gap-3 font-bold text-sm">
      {icon} {label}
    </div>
    <ChevronRight size={18} opacity={0.5} />
  </button>
);

export default Test;