{filtered.map((o) => (
  <div key={o._id} className="bg-zinc-800 p-3 mb-3 rounded">
    <div>ชื่อ: {o.name}</div>
    <div>เบอร์: {o.phone}</div>
    <div>SN: {o.sn}</div>
    <div>สถานะ: {renderStatus(o.status)}</div>

    {o.ram && <div>RAM: {o.ram} GB</div>}
    {o.ssd && <div>SSD: {o.ssd} GB</div>}

    <div className="mt-1 text-sm text-gray-300">
      {[...(o.items || []), o.otherItem || ""]
        .filter(Boolean)
        .join(", ")}
    </div>

    <div className="mt-3 flex gap-2">
      <button
        onClick={() => editOrder(o)}
        className="bg-blue-500 px-3 py-1 rounded"
      >
        ✏️ แก้ไข
      </button>

      {/* 🔥 FIX ตรงนี้ */}
      <a
        href={`/api/orders/${o._id}?pdf=true`}
        target="_blank"
        className="bg-yellow-500 px-3 py-1 rounded text-black"
      >
        📄 PDF
      </a>
    </div>
  </div>
))}