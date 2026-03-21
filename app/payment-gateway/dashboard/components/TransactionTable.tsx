"use client";

import { CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react";

interface Transaction {
  status: string;
  amount: string;
  orderCount: number;
  orderId: string;
  timestamp: string | Date;
  products: string;
}

interface TransactionTableProps {
  data: Transaction[];
  loading: boolean;
  statusColor: (status: string) => string;
}

export default function TransactionTable({ data, loading, statusColor }: TransactionTableProps) {
  return (
    <div className="w-full overflow-hidden border border-zinc-100 bg-white shadow-sm">
      <div className="overflow-x-auto overflow-y-auto max-h-[700px]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/50">
              <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-zinc-400">#</th>
              <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-zinc-400">Transaction Status</th>
              <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-zinc-400">Amount</th>
              <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-zinc-400">Order Storage Count</th>
              <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-zinc-400">Order ID / Ref</th>
              <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-zinc-400">Timestamp</th>
              <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-zinc-400">Product Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {loading && data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-8 py-32 text-center text-zinc-400">
                  <div className="flex flex-col items-center gap-3">
                     <RefreshCw className="h-8 w-8 animate-spin" />
                     <span className="text-[14px] font-medium">Fetching transaction records...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-8 py-32 text-center text-zinc-400">
                   <div className="flex flex-col items-center gap-3">
                     <XCircle className="h-8 w-8" />
                     <span className="text-[14px] font-medium">No transactions found in records.</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-zinc-50/50">
                  <td className="px-8 py-6 text-[11px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">
                    Order {idx + 1}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${statusColor(row.status)}`}>
                      {row.status === "captured" || row.status === "verified" || row.status === "success" ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : row.status === "pending" ? (
                        <Clock className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-[15px] font-bold text-zinc-900 leading-none">
                    ₹{row.amount}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className={`flex h-6 w-8 items-center justify-center text-[11px] font-bold ${row.orderCount > 1 ? 'bg-red-500 text-white' : 'bg-[#0055FF] text-white'}`}>
                         {row.orderCount}
                       </span>
                       <span className="text-[12px] text-zinc-400 font-medium lowercase">records</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <code className="bg-zinc-100 px-2 py-1 text-[12px] text-zinc-600 font-mono">
                      {row.orderId}
                    </code>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[12px] text-zinc-400 font-medium whitespace-nowrap">
                      {new Date(row.timestamp).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="max-w-[180px] truncate text-[14px] font-medium text-zinc-900" title={row.products}>
                      {row.products}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
