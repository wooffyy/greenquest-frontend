import Image from "next/image";

export default function Highlights() {
  return (
    <section className="bg-green-200 text-black p-8 rounded-lg m-4">
      <h2 className="text-3xl font-bold text-center mb-6">Highlights of The Day</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <div className="bg-green-100 p-4 rounded-lg shadow w-full max-w-md">
          <Image src="/images/amba.png" width={400} height={300} alt="Amba" className="rounded"/>
          <p className="text-center mt-4">Mas Amba Membuang 5 Kilogram Sampah Daur Ulang Hari ini!</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow w-full max-w-md">
          <Image src="/images/luna.png" width={400} height={300} alt="Luna" className="rounded"/>
          <p className="text-center mt-4">Bu Luna Menaiki Sepeda ke Kantornya Sejauh 10 Kilometer Hari ini!</p>
        </div>
      </div>
    </section>
  );
}
