import { useNavigate } from "react-router-dom";
import SupportContact from "@/components/SupportContact";

export type AccountSidebarActive = "assign" | "history" | "account";

export default function AccountSidebar({ active = "assign" }: { active?: AccountSidebarActive }) {
  const navigate = useNavigate();
  const Item = ({ id, label, onClick }: { id: AccountSidebarActive; label: string; onClick?: () => void }) => {
    const isActive = active === id;
    const base = "w-full text-left px-3 py-2 rounded flex items-center justify-between";
    return (
      <button
        className={isActive ? `${base} bg-[#F2F2F2]` : `${base} hover:bg-gray-50`}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="text-base font-bold text-black font-[Arial]">{label}</span>
      </button>
    );
  };

  return (
    <aside className="bg-white border border-[#E1E1E1] rounded-lg p-6 space-y-8">
      <nav className="space-y-1" aria-label="Account navigation">
        <Item id="assign" label="Assign warranties" onClick={() => navigate('/assign-warranty')} />
        <Item id="history" label="Order history" onClick={() => navigate('/order-history')} />
        <Item id="account" label="Account information" onClick={() => navigate('/account-data')} />
      </nav>

      <div className="space-y-6 pt-4">
        <SupportContact phone="+49 12334 123124" className="mb-0" />
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12" viewBox="0 0 81 81" fill="none" aria-hidden>
              <path d="M73.9421 23.6687L44.0421 42.6687C43.013 43.3135 41.8231 43.6554 40.6087 43.6554C39.3943 43.6554 38.2045 43.3135 37.1754 42.6687L7.27539 23.6687M13.9421 13.6687H67.2754C70.9573 13.6687 73.9421 16.6535 73.9421 20.3354V60.3354C73.9421 64.0173 70.9573 67.002 67.2754 67.002H13.9421C10.2602 67.002 7.27539 64.0173 7.27539 60.3354V20.3354C7.27539 16.6535 10.2602 13.6687 13.9421 13.6687Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-base text-black font-[Arial] leading-6 mb-1">Write us an email</div>
            <div className="border-b-2 border-black inline-block">
              <a href="mailto:contact@panasonic.eu" className="text-base font-bold text-black font-[Arial]">
                contact@panasonic.eu
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
