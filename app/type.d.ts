interface Product {
    id: string;
    name: string;
    href: string | null;
    price: {
      id: string;
      amount: number;
    };
    imageSrc: string;
    imageAlt: string;
  }


  