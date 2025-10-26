import { IBooking, IBookingLine, IBookingStatus, ICourse, ICourseImage, ICourseSession, IDashboardData, IFacility, IFacilityStaff, ILog, ILogType, IMenu, IMenuNode, IPermission, IPlace, IPlaceWorkingHour, IRole, IRoleUserSummary, ISport, ITeacherCity, ITeacherProfile, ITeacherSport, ITeacherSummary, ITeacherWorkingHour, ITournament, ITournamentImage, ITournamentMatch, ITournamentRegistration, ITournamentStanding, IUser, IUserSummary, IVLog } from "../types";

export const createUserSummary = (defaults?: Partial<IUserSummary>): IUserSummary => ({
    id: defaults?.id ?? 0,
    name: defaults?.name ?? '',
    email: defaults?.email ?? null,
    mobile: defaults?.mobile ?? null,
    mobileVerified: defaults?.mobileVerified ?? false,
    fullName: defaults?.fullName ?? null,
    roleId: defaults?.roleId ?? null,
});


export const createUser = (defaults?: Partial<IUser>): IUser => ({
    id: defaults?.id ?? 0,
    name: defaults?.name ?? '',
    email: defaults?.email ?? null,
    mobile: defaults?.mobile ?? null,
    mobileVerified: defaults?.mobileVerified ?? false,
    picture: defaults?.picture ?? null,
    genderId: defaults?.genderId ?? null,
    birthdate: defaults?.birthdate ?? null,
    address: defaults?.address ?? null,
    city: defaults?.city ?? null,
    state: defaults?.state ?? null,
    country: defaults?.country ?? null,
    postalCode: defaults?.postalCode ?? null,
    countryId: defaults?.countryId ?? null,
    stateId: defaults?.stateId ?? null,
    cityId: defaults?.cityId ?? null,
    marketingOptIn: defaults?.marketingOptIn ?? false,
    passwordMustChange: defaults?.passwordMustChange ?? false,
    isActive: defaults?.isActive ?? true,
    roleId: defaults?.roleId ?? null,
    role: defaults?.role ? createRole(defaults.role) : null,
    password: defaults?.password ?? null,
    passwordSetAt: defaults?.passwordSetAt ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    deletedAt: defaults?.deletedAt ?? null,
    teacherProfile: defaults?.teacherProfile ? createTeacherProfile(defaults.teacherProfile) : null,
});


export const createPermission = (defaults?: Partial<IPermission>): IPermission => ({
    id: defaults?.id ?? 0,
    name: defaults?.name ?? '',
});


export const createRole = (defaults?: Partial<IRole>): IRole => ({
    id: defaults?.id ?? 0,
    name: defaults?.name ?? '',
    description: defaults?.description ?? null,
    permissions: defaults?.permissions ? defaults.permissions.map(createPermission) : [],
    users: defaults?.users ? defaults.users.map(createRoleUserSummary) : [],
});


export const createRoleUserSummary = (defaults?: Partial<IRoleUserSummary>): IRoleUserSummary => ({
    id: defaults?.id ?? 0,
    name: defaults?.name ?? '',
});


export const createMenu = (defaults?: Partial<IMenu>): IMenu => ({
    id: defaults?.id ?? 0,
    name: defaults?.name ?? '',
    url: defaults?.url ?? null,
    icon: defaults?.icon ?? null,
    parentId: defaults?.parentId ?? null,
    sortOrder: defaults?.sortOrder ?? 0,
    isActive: defaults?.isActive ?? true,
    createdBy: defaults?.createdBy ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
});


export const createMenuNode = (defaults?: Partial<IMenuNode>): IMenuNode => ({
    id: defaults?.id ?? 0,
    name: defaults?.name ?? '',
    url: defaults?.url ?? null,
    icon: defaults?.icon ?? null,
    parentId: defaults?.parentId ?? null,
    sortOrder: defaults?.sortOrder ?? 0,
    isActive: defaults?.isActive ?? true,
    children: defaults?.children ? defaults.children.map(createMenuNode) : [],
});

export interface IMetaItem {
    id: number;
    code: string;
    label: string;
}

export const createMetaItem = (defaults?: Partial<IMetaItem>): IMetaItem => ({
    id: defaults?.id ?? 0,
    code: defaults?.code ?? '',
    label: defaults?.label ?? '',
});


export const createSport = (defaults?: Partial<ISport>): ISport => ({
    id: defaults?.id ?? 0,
    code: defaults?.code ?? '',
    name: defaults?.name ?? '',
    isActive: defaults?.isActive ?? true,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    deletedAt: defaults?.deletedAt ?? null,
});


export const createFacility = (defaults?: Partial<IFacility>): IFacility => ({
    id: defaults?.id ?? 0,
    code: defaults?.code ?? null,
    name: defaults?.name ?? '',
    slug: defaults?.slug ?? null,
    timezone: defaults?.timezone ?? 'Asia/Dubai',
    address: defaults?.address ?? null,
    city: defaults?.city ?? null,
    state: defaults?.state ?? null,
    country: defaults?.country ?? null,
    postalCode: defaults?.postalCode ?? null,
    countryId: defaults?.countryId ?? null,
    stateId: defaults?.stateId ?? null,
    cityId: defaults?.cityId ?? null,
    phone: defaults?.phone ?? null,
    email: defaults?.email ?? null,
    postalCodeInt: defaults?.postalCodeInt ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    deletedAt: defaults?.deletedAt ?? null,
});


export const createPlace = (defaults?: Partial<IPlace>): IPlace => ({
    id: defaults?.id ?? 0,
    facilityId: defaults?.facilityId ?? 0,
    name: defaults?.name ?? '',
    sportId: defaults?.sportId ?? 0,
    surface: defaults?.surface ?? null,
    indoor: defaults?.indoor ?? false,
    minCapacity: defaults?.minCapacity ?? 1,
    maxCapacity: defaults?.maxCapacity ?? 1,
    attributes: defaults?.attributes ? { ...defaults.attributes } : {},
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    deletedAt: defaults?.deletedAt ?? null,
    facility: defaults?.facility ? createFacility(defaults.facility) : undefined,
    sport: defaults?.sport ? createSport(defaults.sport) : undefined,
});


export const createPlaceWorkingHour = (defaults?: Partial<IPlaceWorkingHour>): IPlaceWorkingHour => ({
    id: defaults?.id ?? 0,
    placeId: defaults?.placeId ?? 0,
    weekday: defaults?.weekday ?? 0,
    segmentNo: defaults?.segmentNo ?? 1,
    openTime: defaults?.openTime ?? '08:00',
    closeTime: defaults?.closeTime ?? '18:00',
    isClosed: defaults?.isClosed ?? false,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
});


export const createFacilityStaff = (defaults?: Partial<IFacilityStaff>): IFacilityStaff => ({
    userId: defaults?.userId ?? 0,
    facilityId: defaults?.facilityId ?? 0,
    roleId: defaults?.roleId ?? 0,
    user: defaults?.user ? createUserSummary(defaults.user) : undefined,
    role: defaults?.role ? createRole(defaults.role) : undefined,
    facility: defaults?.facility ? createFacility(defaults.facility) : undefined,
});


export const createCourse = (defaults?: Partial<ICourse>): ICourse => ({
    id: defaults?.id ?? 0,
    title: defaults?.title ?? '',
    description: defaults?.description ?? null,
    sportId: defaults?.sportId ?? 0,
    minCapacity: defaults?.minCapacity ?? 1,
    maxCapacity: defaults?.maxCapacity ?? 20,
    bookingDeadline: defaults?.bookingDeadline ?? new Date(),
    isActive: defaults?.isActive ?? true,
    createdBy: defaults?.createdBy ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    deletedAt: defaults?.deletedAt ?? null,
    sport: defaults?.sport ? createSport(defaults.sport) : undefined,
    createdByUser: defaults?.createdByUser ? createUserSummary(defaults.createdByUser) : null,
    images: defaults?.images ? defaults.images.map(createCourseImage) : [],
    sessions: defaults?.sessions ? defaults.sessions.map(createCourseSession) : [],
});


export const createCourseImage = (defaults?: Partial<ICourseImage>): ICourseImage => ({
    id: defaults?.id ?? 0,
    courseId: defaults?.courseId ?? 0,
    url: defaults?.url ?? '',
    sortOrder: defaults?.sortOrder ?? 0,
    createdAt: defaults?.createdAt ?? new Date(),
});


export const createCourseSession = (defaults?: Partial<ICourseSession>): ICourseSession => ({
    id: defaults?.id ?? 0,
    courseId: defaults?.courseId ?? 0,
    teacherId: defaults?.teacherId ?? 0,
    placeId: defaults?.placeId ?? 0,
    slot: defaults?.slot ?? '',
    price: defaults?.price ?? '0.00',
    maxCapacity: defaults?.maxCapacity ?? 0,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    teacher: defaults?.teacher ? createUserSummary(defaults.teacher) : undefined,
    place: defaults?.place ? createPlace(defaults.place) : undefined,
});



export const createTeacherProfile = (defaults?: Partial<ITeacherProfile>): ITeacherProfile => ({
    userId: defaults?.userId ?? 0,
    bio: defaults?.bio ?? null,
    hourlyRate: defaults?.hourlyRate ?? null,
    ratingAvg: defaults?.ratingAvg ?? null,
    ratingCount: defaults?.ratingCount ?? 0,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
});


export const createTeacherSummary = (defaults?: Partial<ITeacherSummary>): ITeacherSummary => ({
    id: defaults?.id ?? 0,
    name: defaults?.name ?? '',
    picture: defaults?.picture ?? null,
    hourlyRate: defaults?.hourlyRate ?? null,
    ratingAvg: defaults?.ratingAvg ?? null,
    ratingCount: defaults?.ratingCount ?? 0,
});


export const createTeacherSport = (defaults?: Partial<ITeacherSport>): ITeacherSport => ({
    teacherId: defaults?.teacherId ?? 0,
    sportId: defaults?.sportId ?? 0,
});


export const createTeacherCity = (defaults?: Partial<ITeacherCity>): ITeacherCity => ({
    teacherId: defaults?.teacherId ?? 0,
    cityId: defaults?.cityId ?? 0,
});



export const createTeacherWorkingHour = (defaults?: Partial<ITeacherWorkingHour>): ITeacherWorkingHour => ({
    id: defaults?.id ?? 0,
    teacherId: defaults?.teacherId ?? 0,
    weekday: defaults?.weekday ?? 0,
    segmentNo: defaults?.segmentNo ?? 1,
    openTime: defaults?.openTime ?? '08:00',
    closeTime: defaults?.closeTime ?? '18:00',
    isClosed: defaults?.isClosed ?? false,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
});



export const createBookingStatus = (defaults?: Partial<IBookingStatus>): IBookingStatus => ({
    id: defaults?.id ?? 0,
    code: defaults?.code ?? '',
    label: defaults?.label ?? '',
});


export const createBookingLine = (defaults?: Partial<IBookingLine>): IBookingLine => ({
    id: defaults?.id ?? 0,
    bookingId: defaults?.bookingId ?? 0,
    placeId: defaults?.placeId ?? 0,
    teacherId: defaults?.teacherId ?? null,
    slot: defaults?.slot ?? '',
    qty: defaults?.qty ?? 1,
    price: defaults?.price ?? '0.00',
    currency: defaults?.currency ?? 'ریال',
    courseSessionId: defaults?.courseSessionId ?? null,
    pricingProfileId: defaults?.pricingProfileId ?? null,
    appliedRuleIds: defaults?.appliedRuleIds ?? null,
    pricingDetails: defaults?.pricingDetails ? { ...defaults.pricingDetails } : {},
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    deletedAt: defaults?.deletedAt ?? null,
    place: defaults?.place ? createPlace(defaults.place) : undefined,
    teacher: defaults?.teacher ? createUserSummary(defaults.teacher) : undefined,
    courseSession: defaults?.courseSession ? createCourseSession(defaults.courseSession) : undefined,
});


export const createBooking = (defaults?: Partial<IBooking>): IBooking => ({
    id: defaults?.id ?? 0,
    userId: defaults?.userId ?? 0,
    statusId: defaults?.statusId ?? 0,
    total: defaults?.total ?? '0.00',
    currency: defaults?.currency ?? 'ریال',
    idempotencyKey: defaults?.idempotencyKey ?? null,
    holdExpiresAt: defaults?.holdExpiresAt ?? null,
    paymentReference: defaults?.paymentReference ?? null,
    paymentFailureReason: defaults?.paymentFailureReason ?? null,
    paidAt: defaults?.paidAt ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    deletedAt: defaults?.deletedAt ?? null,
    lines: defaults?.lines ? defaults.lines.map(createBookingLine) : [],
    user: defaults?.user ? createUserSummary(defaults.user) : undefined,
    status: defaults?.status ? createBookingStatus(defaults.status) : undefined,
});


export const createDashboardData = (defaults?: Partial<IDashboardData>): IDashboardData => ({
    kpis: {
        bookingsToday: defaults?.kpis?.bookingsToday ?? 0,
        bookingsThisMonth: defaults?.kpis?.bookingsThisMonth ?? 0,
        bookingsThisYear: defaults?.kpis?.bookingsThisYear ?? 0,
        revenueThisMonth: defaults?.kpis?.revenueThisMonth ?? 0,
        totalBookings: defaults?.kpis?.totalBookings ?? 0,
        upcomingBookings: defaults?.kpis?.upcomingBookings ?? 0,
        pastDoneBookings: defaults?.kpis?.pastDoneBookings ?? 0,
        cancelledBookings: defaults?.kpis?.cancelledBookings ?? 0,
        currentCourses: defaults?.kpis?.currentCourses ?? 0,
        currentTournaments: defaults?.kpis?.currentTournaments ?? 0,
        totalCourses: defaults?.kpis?.totalCourses ?? 0,
        totalTournaments: defaults?.kpis?.totalTournaments ?? 0,
    },
    byStatus: defaults?.byStatus ? defaults.byStatus.map((item) => ({ ...item })) : [],
    byFacility: defaults?.byFacility ? defaults.byFacility.map((item) => ({ ...item })) : [],
    bySport: defaults?.bySport ? defaults.bySport.map((item) => ({ ...item })) : [],
    monthlyCountsGregorian: defaults?.monthlyCountsGregorian ? [...defaults.monthlyCountsGregorian] : Array(12).fill(0),
    monthlyCountsPersian: defaults?.monthlyCountsPersian ? [...defaults.monthlyCountsPersian] : undefined,
    topTeachersThisMonth: defaults?.topTeachersThisMonth ? defaults.topTeachersThisMonth.map((item) => ({ ...item })) : [],
    lastActivities: defaults?.lastActivities ? defaults.lastActivities.map((item) => ({ ...item })) : [],
});


export const createTournament = (defaults?: Partial<ITournament>): ITournament => ({
    id: defaults?.id ?? 0,
    title: defaults?.title ?? '',
    description: defaults?.description ?? null,
    sportId: defaults?.sportId ?? 0,
    typeId: defaults?.typeId ?? 0,
    minCapacity: defaults?.minCapacity ?? 2,
    maxCapacity: defaults?.maxCapacity ?? 64,
    bookingDeadline: defaults?.bookingDeadline ?? new Date(),
    startAt: defaults?.startAt ?? new Date(),
    endAt: defaults?.endAt ?? new Date(),
    facilityId: defaults?.facilityId ?? null,
    eventPlaceId: defaults?.eventPlaceId ?? null,
    eventSlot: defaults?.eventSlot ?? null,
    isActive: defaults?.isActive ?? true,
    createdBy: defaults?.createdBy ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    deletedAt: defaults?.deletedAt ?? null,
    sport: defaults?.sport ? createSport(defaults.sport) : undefined,
    facility: defaults?.facility ? createFacility(defaults.facility) : undefined,
    eventPlace: defaults?.eventPlace ? createPlace(defaults.eventPlace) : undefined,
    type: defaults?.type ? { ...defaults.type } : undefined,
    createdByUser: defaults?.createdByUser ? createUserSummary(defaults.createdByUser) : null,
    images: defaults?.images ? defaults.images.map(createTournamentImage) : [],
    registrations: defaults?.registrations ? defaults.registrations.map(createTournamentRegistration) : [],
    matches: defaults?.matches ? defaults.matches.map(createTournamentMatch) : [],
});


export const createTournamentImage = (defaults?: Partial<ITournamentImage>): ITournamentImage => ({
    id: defaults?.id ?? 0,
    tournamentId: defaults?.tournamentId ?? 0,
    url: defaults?.url ?? '',
    sortOrder: defaults?.sortOrder ?? 0,
    createdAt: defaults?.createdAt ?? new Date(),
});

export const createTournamentRegistration = (defaults?: Partial<ITournamentRegistration>): ITournamentRegistration => ({
    id: defaults?.id ?? 0,
    tournamentId: defaults?.tournamentId ?? 0,
    userId: defaults?.userId ?? 0,
    statusId: defaults?.statusId ?? 0,
    holdExpiresAt: defaults?.holdExpiresAt ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    status: defaults?.status ? { ...defaults.status } : undefined,
    user: defaults?.user ? createUserSummary(defaults.user) : undefined,
});

export const createTournamentMatch = (defaults?: Partial<ITournamentMatch>): ITournamentMatch => ({
    id: defaults?.id ?? 0,
    tournamentId: defaults?.tournamentId ?? 0,
    roundNo: defaults?.roundNo ?? 1,
    matchNo: defaults?.matchNo ?? 1,
    aUserId: defaults?.aUserId ?? null,
    bUserId: defaults?.bUserId ?? null,
    winnerUserId: defaults?.winnerUserId ?? null,
    aScore: defaults?.aScore ?? null,
    bScore: defaults?.bScore ?? null,
    placeId: defaults?.placeId ?? null,
    slot: defaults?.slot ?? null,
    status: defaults?.status ?? 'scheduled',
    createdAt: defaults?.createdAt ?? new Date(),
    updatedAt: defaults?.updatedAt ?? new Date(),
    aUser: defaults?.aUser ? createUserSummary(defaults.aUser) : null,
    bUser: defaults?.bUser ? createUserSummary(defaults.bUser) : null,
    winnerUser: defaults?.winnerUser ? createUserSummary(defaults.winnerUser) : null,
    place: defaults?.place ? createPlace(defaults.place) : null,
});

export const createTournamentStanding = (defaults?: Partial<ITournamentStanding>): ITournamentStanding => ({
    userId: defaults?.userId ?? 0,
    userName: defaults?.userName ?? '',
    points: defaults?.points ?? 0,
    wins: defaults?.wins ?? 0,
    losses: defaults?.losses ?? 0,
    draws: defaults?.draws ?? 0,
    scoreFor: defaults?.scoreFor ?? 0,
    scoreAgainst: defaults?.scoreAgainst ?? 0,
});

export const createLogType = (defaults?: Partial<ILogType>): ILogType => ({
    id: defaults?.id ?? 0,
    code: defaults?.code ?? '',
    description: defaults?.description ?? null,
    createdBy: defaults?.createdBy ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
});


export const createLog = (defaults?: Partial<ILog>): ILog => ({
    id: defaults?.id ?? 0,
    typeId: defaults?.typeId ?? null,
    type: defaults?.type ? createLogType(defaults.type) : null,
    text1: defaults?.text1 ?? null,
    text2: defaults?.text2 ?? null,
    text3: defaults?.text3 ?? null,
    text4: defaults?.text4 ?? null,
    createdBy: defaults?.createdBy ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
});

export const createVLog = (defaults?: Partial<IVLog>): IVLog => ({
    id: defaults?.id ?? 0,
    typeId: defaults?.typeId ?? null,
    typeCode: defaults?.typeCode ?? null,
    typeName: defaults?.typeName ?? null,
    typeDescription: defaults?.typeDescription ?? null,
    text1: defaults?.text1 ?? null,
    text2: defaults?.text2 ?? null,
    text3: defaults?.text3 ?? null,
    text4: defaults?.text4 ?? null,
    createdAt: defaults?.createdAt ?? new Date(),
    createdBy: defaults?.createdBy ?? null,
    createdByName: defaults?.createdByName ?? null,
});
