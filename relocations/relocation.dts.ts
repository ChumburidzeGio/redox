import {
    Length,
    IsString,
    IsMobilePhone,
    IsEmail,
    IsDate,
    MaxLength,
    ValidateNested
} from 'class-validator';
import clients from './clients'
import services from './services'

class Person {
    @Length(2, 120)
    firstName: string;

    @Length(2, 120)
    lastName: string;

    @IsString()
    gender: 'male' | 'female' | 'non_binary' | 'rather_not_share'

    @IsDate()
    birth_date: string

    @MaxLength(2, {
        each: true,
    })
    nationalities: string[]
}

class Adult extends Person {
    @IsMobilePhone()
    phone: string

    @IsEmail()
    email: string
}

export class Relocation extends Adult {
    @IsString()
    relationship: 'single' | 'married' | 'registered_partnership' | 'cohabitation' | 'divorced' | 'widowed'

    @IsString()
    status: 'completed' | 'active' | 'canceled'
    
    @IsString()
    title: string

    @IsString()
    company: keyof typeof clients

    @ValidateNested()
    partner: Adult

    @ValidateNested()
    children: Person[]
    
    @IsString({
        each: true,
    })
    services: keyof typeof services

    @MaxLength(2)
    origin_country: string

    @MaxLength(30)
    destination_city: string
    
    @IsString()
    notes: string
}
