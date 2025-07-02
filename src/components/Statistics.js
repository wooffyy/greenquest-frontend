import Image from "next/image";

export default function Statistics() {
  return (
    <section className="bg-green-300 text-black p-8 rounded-lg m-4">
      <h2 className="text-3xl font-bold text-center mb-6">Statistics and Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        
        {/* Stat Card 1 */}
        <div className="bg-green-100 p-4 rounded-lg shadow w-full max-w-md flex flex-col items-center">
          <Image
            src="/images/users.png"
            width={300}
            height={200}
            alt="Users"
            className="rounded object-cover"
          />
          <p className="mt-4 text-center font-semibold">5023 Pengguna Aktif 🔥</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-green-100 p-4 rounded-lg shadow w-full max-w-md flex flex-col items-center">
          <Image
            src="/images/recycle.png"
            width={300}
            height={200}
            alt="Recycle"
            className="rounded object-cover"
          />
          <p className="mt-4 text-center font-semibold">5000 Kilogram Sampah Berhasil Didaur Ulang ♻️</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-green-100 p-4 rounded-lg shadow w-full max-w-md flex flex-col items-center">
          <Image
            src="/images/plastic.png"
            width={300}
            height={200}
            alt="Plastic Waste"
            className="rounded object-cover"
          />
          <p className="mt-4 text-center font-semibold">Mengurangi Sampah Plastik 🥤</p>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-green-100 p-4 rounded-lg shadow w-full max-w-md flex flex-col items-center">
          <Image
            src="/images/energy.png"
            width={300}
            height={200}
            alt="Energy Saving"
            className="rounded object-cover"
          />
          <p className="mt-4 text-center font-semibold">Hemat Energi & Mengurangi Polusi ⚡</p>
        </div>
      </div>
    </section>
  );
}
