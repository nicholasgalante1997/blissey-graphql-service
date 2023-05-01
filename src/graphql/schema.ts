import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLScalarType } from 'graphql';
import { MongoDbClient } from '../mongodb';

const dbClient = new MongoDbClient();

const GqlHealthCheckSchemaType = new GraphQLObjectType<any, any>({
  name: 'GqlHealthCheck',
  fields: () => ({
    status: { type: GraphQLString },
  }),
});

const TCGPlayerPricesSchema = new GraphQLObjectType<any, any>({
  name: 'TCGPlayerPrice',
  fields: () => ({
    reverseHolofoil: { type: PriceGradeSchemaType },
    normal: { type: PriceGradeSchemaType }
  })
})

const PriceGradeSchemaType = new GraphQLObjectType<any, any>({
  name: 'PriceGrade',
  fields: () => ({
    low: { type: GraphQLInt },
    mid: { type: GraphQLInt },
    high: { type: GraphQLInt },
    market: { type: GraphQLInt },
    directLow: { type: GraphQLInt }
  })
});

const TCGPlayerSchemaType = new GraphQLObjectType<any, any>({
  name: 'TCGPlayer',
  fields: () => ({
    url: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    prices: { type: TCGPlayerPricesSchema }
  })
});

const SetImageSchemaType = new GraphQLObjectType<any, any>({
  name: 'SetImage',
  fields: () => ({
    logo: { type: GraphQLString },
    symbol: { type: GraphQLString }
  })
});

const CardSetSchemaType = new GraphQLObjectType<any, any>({
  name: 'CardSet',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    series: { type: GraphQLString },
    printedTotal: { type: GraphQLInt },
    total: { type: GraphQLInt },
    legalities: { type: LegalitySchemaType },
    releaseDate: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    images: { type: SetImageSchemaType }
  })
});

const ResistanceSchemaType = new GraphQLObjectType<any, any>({
  name: 'Resistance',
  fields: () => ({
    type: { type: GraphQLString },
    value: { type: GraphQLString }
  })
});

const WeaknessSchemaType = new GraphQLObjectType<any, any>({
  name: 'Weakness',
  fields: () => ({
    type: { type: GraphQLString },
    value: { type: GraphQLString }
  })
});

const LegalitySchemaType = new GraphQLObjectType<any, any>({
  name: 'Legalities',
  fields: () => ({
    unlimited: { type: GraphQLString },
    standard: { type: GraphQLString },
    expanded: { type: GraphQLString }
  })
})

const ImageSchemaType = new GraphQLObjectType<any, any>({
  name: 'Image',
  fields: () => ({
    small: { type: GraphQLString },
    large: { type: GraphQLString }
  })
});

const CardMarketPriceSchemaType = new GraphQLObjectType<any, any>({
  name: 'Price',
  fields: () => ({
    averageSellPrice: { type: GraphQLInt },
    avg1: { type: GraphQLInt },
    avg7: { type: GraphQLInt },
    avg30: { type: GraphQLInt },
    germanProLow: { type: GraphQLInt },
    lowPrice: { type: GraphQLInt },
    lowPriceExPlus: { type: GraphQLInt },
    reverseHoloAvg1: { type: GraphQLInt },
    reverseHoloAvg7: { type: GraphQLInt },
    reverseHoloAvg30: { type: GraphQLInt },
    reverseHoloLow: { type: GraphQLInt },
    reverseHoloSell: { type: GraphQLInt },
    reverseHoloTrend: { type: GraphQLInt },
    suggestedPrice: { type: GraphQLInt },
    trendPrice: { type: GraphQLInt }
  })
});

const CardMarketSchemaType = new GraphQLObjectType<any, any>({
  name: 'CardMarket',
  fields: () => ({
    url: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    prices: { type: CardMarketPriceSchemaType }
  })
});

const AttackSchemaType = new GraphQLObjectType<any, any>({
  name: 'Attack',
  fields: () => ({
    cost: { type: new GraphQLList(GraphQLString) },
    name: { type: GraphQLString },
    damage: { type: GraphQLString },
    text: { type: GraphQLString },
    convertedEnergyCosts: { type: GraphQLInt }
  })
});

const CardSchemaType = new GraphQLObjectType<any, any>({
  name: 'Card',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    supertype: { type: GraphQLString },
    subtypes: { type: new GraphQLList(GraphQLString) },
    hp: { type: GraphQLString },
    types: { type: new GraphQLList(GraphQLString) },
    attacks: { type: new GraphQLList(AttackSchemaType) },
    artist: { type: GraphQLString },
    convertedRetreatCost: { type: GraphQLInt },
    retreatCost: { type: new GraphQLList(GraphQLString) },
    cardmarket: { type: CardMarketSchemaType },
    images: { type: ImageSchemaType },
    legalities: { type: LegalitySchemaType },
    nationalPokedexNumbers: { type: new GraphQLList(GraphQLInt) },
    number: { type: GraphQLString },
    rarity: { type: GraphQLString },
    regulationMark: { type: GraphQLString },
    resistances: { type: new GraphQLList(ResistanceSchemaType) },
    set: { type: CardSetSchemaType },
    tcgplayer: { type: TCGPlayerSchemaType },
    weaknesses: { type: new GraphQLList(WeaknessSchemaType) }
  }),
})

const RootQuery = new GraphQLObjectType<any, any>({
  name: 'RootQueryType',
  fields: () => ({
    healthCheck: {
      type: GqlHealthCheckSchemaType,
      resolve(parentValue, args) {
        return { status: 'GraphQLServer Status Healthy' };
      },
    },
    card: {
      type: CardSchemaType,
      args: { id: { type: GraphQLString }},
      async resolve(parentValue, args){
        const card = await dbClient.getCardById(args.id);
        return card;
      }
    }
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export { schema };
