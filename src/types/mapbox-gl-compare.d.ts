declare module 'mapbox-gl-compare' {
  
  interface CompareOptions {
    orientation?: 'vertical' | 'horizontal'
    mousemove?: boolean
    touchmove?: boolean
  }

  class Compare {
    constructor(
      before: mapboxgl.Map,
      after: mapboxgl.Map,
      container: HTMLElement,
      options?: CompareOptions
    )
    
    setSlider(slider: number): void
    on(event: string, callback: () => void): void
    off(event: string, callback: () => void): void
    remove(): void
  }

  export = Compare
}

declare global {
  namespace mapboxgl {
    interface Map {
      Compare: typeof import('mapbox-gl-compare')
    }
  }
}