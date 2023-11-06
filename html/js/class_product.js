 class Product {
    constructor(id = "id", name = "product name", price = 1, images =
     ["bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_1.jpg",
    "bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_2.jpg",
    "bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_3.jpg"]) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.images = images || 
        ["bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_1.jpg",
        "bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_2.jpg",
        "bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_3.jpg"]
    }
}