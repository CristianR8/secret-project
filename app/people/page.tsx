import Footer from "@/sections/Footer/Server";
import NavBar from "@/components/Client/NavBar";
import LightEffect from "@/sections/Hero/LightEffect";
import Image, { StaticImageData } from "next/image";
import PeopleBackground from "@/public/group.webp";
import MaskText from "@/components/Server/MaskText";
import ResponsiveMarquee from "@/components/Client/ResponsiveMarquee";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import Br from "@/components/Server/Br";

type Person = {
  name: string;
  image?: StaticImageData | string;
};

type Group = {
  title: string;
  label: string;
  members: Person[];
};

const groups: Group[] = [
  {
    title: "Director",
    label: "Director",
    members: [
      {
        name: "Hoover Rueda Chacon",
        image: "/People/hoover.png",
      },
    ],
  },
  {
    title: "MSc Students",
    label: "MSc Student",
    members: [
      {
        name: "Andrea Parra",
        image: "/People/andrea.png",
      },
      {
        name: "Cristhian Rey",
        image: "/People/cristian.png",
      },
      {
        name: "Fabian Perez",
        image: "/People/fabian.png",
      },
      {
        name: "Guillermo Pinto",
        image: "/People/guillermo.png",
      },
      {
        name: "Henry Mantilla",
        image: "/People/henry.png",
      },
      {
        name: "Jorge Garcia",
        image: "/People/jorge.png",
      },
      {
        name: "Julian Leon",
        image: "/People/julian.png",
      },
      {
        name: "Manuel Herrera",
      },
    ],
  },
  {
    title: "Undergraduate Students",
    label: "Undergraduate",
    members: [
      {
        name: "Brayan Quintero",
        image: "/People/brayan.png",
      },
      {
        name: "Alejandro Moreno",
      },
      {
        name: "Cesar Vanegas",
        image: "/People/cesar.png",
      },
      {
        name: "Christian Orduz",
      },
      {
        name: "Cristhian Tristancho",
      },
      {
        name: "Dana Villamizar",
        image: "/People/dana.png",
      },
      {
        name: "Jeferson Acevedo",
      },
      {
        name: "Juan Ardila",
      },
      {
        name: "Juan Arias",
      },
      {
        name: "Juan Toloza",
        image: "/People/juan_toloza.png",
      },
      {
        name: "Juan David Vanegas",
      },
      {
        name: "Juan Felipe Serrano",
      },
      {
        name: "Juan Calderon",
        image: "/People/juanjo.png",
      },
      {
        name: "Maria Lucia Rodriguez",
      },
      {
        name: "Mateo Delgado",
      },
      {
        name: "Miguel Ayala",
      },
      {
        name: "Nicolas Quintero",
      },
      {
        name: "Nicolas Rivera",
      },
      {
        name: "Oscar Carreno",
      },
      {
        name: "Oscar Miguel",
      },
      {
        name: "Samuel Penilla",
      },
      {
        name: "Sebastian Solano",
        image: "/People/sebas.png",
      },
      {
        name: "Sebastian Diaz",
      },
      {
        name: "Sneider Sanchez",
        image: "/People/sneider.png",
      },
      {
        name: "Valentina Perez",
        image: "/People/valentina.png",
      },
    ],
  },
];

function DummyPortrait({
  name,
  label,
  image,
}: {
  name: string;
  label: string;
  image?: StaticImageData | string;
}) {
  return (
    <div className="group relative h-[23rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#061411] shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#7BFFD0]/25 hover:shadow-[0_28px_70px_rgba(33,201,143,0.22)] md:h-[26rem]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(96% 82% at 50% 88%, rgba(118, 255, 206, 0.68), rgba(48, 192, 134, 0.24) 40%, rgba(6, 20, 17, 0) 72%), linear-gradient(180deg, #0a1915 0%, #06100e 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(62%_44%_at_50%_84%,rgba(225,255,244,0.38),rgba(225,255,244,0)_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-3 top-3 bottom-0 overflow-hidden rounded-[1rem]">
        {image ? (
          <Image
            src={image}
            alt={`${name} portrait`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(180deg,rgba(120,255,210,0.08),rgba(9,19,16,0.14))] px-8">
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="h-[11rem] w-[11rem] text-[#C8F7E3] drop-shadow-[0_18px_48px_rgba(64,179,140,0.2)]"
              fill="none"
            >
              <circle cx="32" cy="20" r="10" fill="currentColor" opacity="0.92" />
              <path
                d="M16 52c2.8-9.4 9-14 16-14s13.2 4.6 16 14"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                opacity="0.92"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(180deg,rgba(6,20,17,0)_0%,rgba(6,20,17,0.74)_52%,rgba(6,20,17,0.96)_100%)]" />
      <div className="absolute inset-x-5 bottom-5">
        <p className="text-[1.35rem] [line-height:1.02] tracking-[-0.02em] text-white md:text-[1.55rem]">
          {name}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#9AF1CF]/78">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function PeoplePage() {
  return (
    <main>
      <section className="relative bg-[#2b3530]">
        <div className="pointer-events-none sticky top-0 z-0 h-screen overflow-hidden">
          <LightEffect />
        </div>
        <div className="relative z-10 -mt-[100svh] text-[#D1CCBF]">
          <section className="relative h-[100svh] overflow-hidden">
            <Image
              src={PeopleBackground}
              alt="CVAIL people group"
              fill
              priority
              className="object-cover object-[center_100%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,14,12,0.12),rgba(8,12,10,0.28)_45%,rgba(5,8,7,0.72)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(5,8,7,0)_0%,rgba(5,8,7,0.28)_22%,rgba(5,8,7,0.62)_62%,rgba(5,8,7,0.92)_100%)]" />
            <div className="relative z-10 flex h-screen flex-col justify-end gap-8">
              <MaskText
                transition={{ delayChildren: 0.2 }}
                lines={[
                  <div
                    key="marquee"
                    className="w-full overflow-hidden rounded-none px-4 py-2 text-white"
                  >
                    <ResponsiveMarquee
                      animationConfig={{
                        mobile: {
                          max: "-1600px",
                          speed: 50,
                        },
                        desktop: {
                          max: "-160%",
                          speed: 5,
                        },
                      }}
                      className="text-white"
                    >
                      {"CVAIL • CVAIL • CVAIL • CVAIL • CVAIL • CVAIL • "}
                    </ResponsiveMarquee>
                  </div>,
                ]}
              />
              <div className="relative flex justify-center overflow-hidden py-5 font-light text-white md:mx-10 md:justify-between md:py-4 [&>*]:shrink-0">
                <MaskText
                  transition={{
                    delayChildren: 0.2,
                  }}
                  className="flex-1 max-md:hidden"
                  lines={[
                    <div
                      key="item-1"
                      style={{
                        height: `${12 * Math.sqrt(2)}px`,
                      }}
                    >
                      <NavigateSVG
                        style={{ transform: "rotate(135deg)", fill: "#ffffff" }}
                      />
                    </div>,
                  ]}
                />
                <MaskText
                  transition={{
                    delayChildren: 0.4,
                  }}
                  className="font-normal text-lg md:text-2xl md:[line-height:1.2]"
                  lines={[<>Computer Vision and Artificial Intelligence Lab</>]}
                />
                <MaskText
                  transition={{
                    delayChildren: 0.6,
                  }}
                  lines={[<>Scroll to learn more about us.</>]}
                  className="text-md flex-1 text-end text-nowrap [filter:blur(0.25px)] max-md:hidden"
                />
                <Br />
              </div>
            </div>
          </section>

          <div className="px-3-75 pb-36 pt-16 md:px-16 md:pb-56 md:pt-24">
            <div className="mx-auto max-w-[1180px]">
              <div className="rounded-2xl border border-white/20 bg-[#1f2824]/55 p-6 text-center text-[#EEF2E8] shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
                <p className="text-sm text-white/70 md:text-base">
                  Our Mision
                </p>
                <p className="mx-auto mt-4 max-w-[760px] text-base [line-height:1.35] text-white/90 md:text-24">
                  We drive innovation by training the next generation of
                  computer vision experts through research and collaborative
                  experiences.
                </p>
              </div>

              <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
                {groups.map((group) => (
                  <section
                    key={group.title}
                    className="rounded-2xl border border-white/20 bg-[#1f2824]/55 p-5 text-center text-[#EEF2E8] shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-7"
                  >
                    <h2 className="text-2xl [line-height:1.1] md:text-40">
                      {group.title}
                    </h2>

                    <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {group.members.map((person) => (
                        <article
                          key={person.name}
                          className="text-center"
                        >
                          <DummyPortrait
                            name={person.name}
                            label={group.label}
                            image={person.image}
                          />
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <NavBar />
    </main>
  );
}
