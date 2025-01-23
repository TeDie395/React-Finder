// Asegúrate de que todos los filtros usen objetos con min y max para priceRange y areaRange.
export interface FilterOptions {
    city: string;
    priceRange: { min: number; max: number }; // Usar objetos con min y max
    areaRange: { min: number; max: number };  // Usar objetos con min y max
}

