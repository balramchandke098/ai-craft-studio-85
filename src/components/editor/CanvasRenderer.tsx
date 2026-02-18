import { CanvasElement } from "@/types/builder";

interface Props {
  element: CanvasElement;
}

export default function CanvasRenderer({ element }: Props) {
  switch (element.type) {
    case "navbar":
      return (
        <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white">
          <span className="font-bold text-lg">{element.props.brand}</span>
          <div className="flex gap-6 text-sm">
            {(element.props.links as string[])?.map((l, i) => (
              <span key={i} className="opacity-80 hover:opacity-100 cursor-pointer">{l}</span>
            ))}
          </div>
        </nav>
      );

    case "hero":
      return (
        <section className="px-8 py-20 text-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <h1 className="text-4xl font-bold mb-4">{element.props.title}</h1>
          <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">{element.props.subtitle}</p>
          <button className="px-6 py-3 bg-teal-500 text-gray-900 font-semibold rounded-lg hover:bg-teal-400 transition">
            {element.props.cta}
          </button>
        </section>
      );

    case "features":
      return (
        <section className="px-8 py-16 bg-white">
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(element.props.items as { title: string; description: string }[])?.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-600 font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "cta":
      return (
        <section className="px-8 py-16 text-center bg-teal-500">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{element.props.title}</h2>
          <p className="text-gray-800 mb-6">{element.props.subtitle}</p>
          <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            {element.props.button}
          </button>
        </section>
      );

    case "footer":
      return (
        <footer className="px-8 py-6 bg-gray-900 text-gray-400 text-sm flex justify-between">
          <span>© {element.props.year} {element.props.brand}</span>
          <span>Built with SiteForge AI</span>
        </footer>
      );

    case "heading":
      return (
        <div className="px-8 py-4">
          <h2 className="text-2xl font-bold text-gray-900">{element.props.text}</h2>
        </div>
      );

    case "text":
      return (
        <div className="px-8 py-3">
          <p className="text-gray-700">{element.props.text}</p>
        </div>
      );

    case "button":
      return (
        <div className="px-8 py-3">
          <button className="px-5 py-2.5 bg-teal-500 text-white font-medium rounded-lg">{element.props.text}</button>
        </div>
      );

    case "image":
      return (
        <div className="px-8 py-3">
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            {element.props.src ? <img src={element.props.src} alt={element.props.alt} className="w-full h-full object-cover rounded-lg" /> : "Image Placeholder"}
          </div>
        </div>
      );

    case "divider":
      return <hr className="mx-8 my-4 border-gray-200" />;

    case "spacer":
      return <div style={{ height: element.props.height || "40px" }} />;

    case "card":
      return (
        <div className="px-8 py-3">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">{element.props.title}</h3>
            <p className="text-sm text-gray-600">{element.props.description}</p>
          </div>
        </div>
      );

    case "contact":
      return (
        <section className="px-8 py-16 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{element.props.title}</h2>
          <div className="max-w-md mx-auto space-y-4">
            <input placeholder="Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm" />
            <input placeholder="Email" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm" />
            <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none" />
            <button className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg">Send Message</button>
          </div>
        </section>
      );

    case "form":
      return (
        <div className="px-8 py-6">
          <div className="max-w-md mx-auto space-y-3">
            {(element.props.fields as string[])?.map((field, i) => (
              <input key={i} placeholder={field} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm" />
            ))}
            <button className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg">Submit</button>
          </div>
        </div>
      );

    case "testimonials":
      return (
        <section className="px-8 py-16 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What People Say</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {(element.props.items as { name: string; text: string }[])?.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100">
                <p className="text-gray-700 italic mb-3">"{item.text}"</p>
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "pricing":
      return (
        <section className="px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Pricing</h2>
          <div className="flex justify-center gap-6">
            {(element.props.plans as { name: string; price: string }[])?.map((plan, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6 text-center min-w-[200px]">
                <h3 className="font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-teal-500 mb-4">{plan.price}</p>
                <button className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm">Choose</button>
              </div>
            ))}
          </div>
        </section>
      );

    default:
      return (
        <div className="px-8 py-4 text-gray-400 text-sm border border-dashed border-gray-200 m-4 rounded text-center">
          Unknown component: {element.type}
        </div>
      );
  }
}
