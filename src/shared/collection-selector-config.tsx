export interface CollectionSelectorConfig {
 multiple?: boolean;
 title?: string;
 identity?: string;
 visibleColumn: Column[];
 primaryColumn?: Column;
 endpoint?: string;
 size?: string;
 filter?: Filter[][];
  }
  
  export interface Column {
 name: string;
 key: string;
 hasLocale?: boolean;
 deep?: boolean;
 deepKey?: string;
 isTranslate?: boolean;
  }
  
  export interface Filter {
 field: string;
 fieldName: string;
 value: any;
 operator?: string;
 name?: string;
  }
  